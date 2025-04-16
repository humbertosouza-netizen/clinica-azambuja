const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Diretório base para imagens
const baseImageDir = path.join(__dirname, '../public/images');

// Configurações de otimização
const config = {
  quality: 80,
  width: 1200, // largura máxima para imagens grandes
};

// Verificar se o arquivo é realmente uma imagem válida
function isValidImage(filePath) {
  try {
    // Tentar ler os primeiros bytes para verificar se é uma imagem
    const buffer = Buffer.alloc(12);
    const fd = fs.openSync(filePath, 'r');
    fs.readSync(fd, buffer, 0, 12, 0);
    fs.closeSync(fd);
    
    // Assinaturas de início de arquivos comuns para JPEG, PNG
    const jpegSignature = Buffer.from([0xFF, 0xD8, 0xFF]);
    const pngSignature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
    
    if (buffer.slice(0, 3).equals(jpegSignature) || buffer.slice(0, 8).equals(pngSignature)) {
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Erro ao verificar arquivo ${filePath}:`, error.message);
    return false;
  }
}

// Encontrar todas as imagens recursivamente
function findAllImages(directory) {
  let imageFiles = [];
  
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    
    // Pular diretórios especiais
    if (file === 'node_modules' || file === '.next' || file === 'optimized' || file === 'original-backup') {
      continue;
    }
    
    try {
      const stats = fs.statSync(fullPath);
      
      if (stats.isDirectory()) {
        // Recursivamente buscar arquivos nas pastas
        const nestedImages = findAllImages(fullPath);
        imageFiles = [...imageFiles, ...nestedImages];
      } else if (stats.isFile() && file.match(/\.(jpg|jpeg|png)$/i)) {
        // Adicionar à lista se for um arquivo de imagem
        imageFiles.push(fullPath);
      }
    } catch (error) {
      console.error(`Erro ao processar ${fullPath}:`, error.message);
    }
  }
  
  return imageFiles;
}

// Otimizar uma imagem
async function optimizeImage(imagePath) {
  try {
    if (!isValidImage(imagePath)) {
      console.log(`Pulando ${path.basename(imagePath)} (não é uma imagem válida)`);
      return null;
    }
    
    // Obter tamanho do arquivo original em MB
    const stats = fs.statSync(imagePath);
    const originalSize = stats.size / (1024 * 1024);
    
    // Determinar o diretório de saída (mesmo diretório do original)
    const outputDir = path.dirname(imagePath);
    const outputPath = path.join(outputDir, path.basename(imagePath));
    const backupPath = path.join(outputDir, 'original-backup');
    
    // Garantir que o diretório de backup exista
    if (!fs.existsSync(backupPath)) {
      fs.mkdirSync(backupPath, { recursive: true });
    }
    
    // Backup do arquivo original
    const backupFile = path.join(backupPath, path.basename(imagePath));
    if (!fs.existsSync(backupFile)) {
      fs.copyFileSync(imagePath, backupFile);
    }
    
    console.log(`Processando ${path.basename(imagePath)} (${originalSize.toFixed(2)} MB)...`);
    
    // Nome temporário para o arquivo otimizado
    const tempOutputPath = path.join(outputDir, `temp_${path.basename(imagePath)}`);
    
    // Determinar formato de saída (manter formato original)
    const format = path.extname(imagePath).toLowerCase() === '.png' ? 'png' : 'jpeg';
    
    // Processar a imagem
    await sharp(imagePath)
      .resize({ 
        width: config.width, 
        height: null, 
        fit: 'inside',
        withoutEnlargement: true 
      })
      [format]({ quality: config.quality })
      .toFile(tempOutputPath);
    
    // Substituir original com o arquivo otimizado
    fs.unlinkSync(imagePath);
    fs.renameSync(tempOutputPath, outputPath);
    
    // Obter tamanho do arquivo otimizado em MB
    const optimizedSize = fs.statSync(outputPath).size / (1024 * 1024);
    
    // Calcular economia de tamanho
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(2);
    
    console.log(`✅ ${path.basename(imagePath)}: ${originalSize.toFixed(2)} MB → ${optimizedSize.toFixed(2)} MB (${savings}% redução)`);
    
    return {
      file: path.basename(imagePath),
      originalSize,
      optimizedSize,
      savings: parseFloat(savings)
    };
  } catch (error) {
    console.error(`❌ Erro ao otimizar ${path.basename(imagePath)}:`, error.message);
    return null;
  }
}

// Função principal
async function optimizeAllImages() {
  try {
    console.log('Buscando imagens...');
    const allImages = findAllImages(baseImageDir);
    console.log(`Encontradas ${allImages.length} imagens para otimizar.`);
    
    let results = [];
    let totalSaved = 0;
    let totalOriginalSize = 0;
    
    for (const imagePath of allImages) {
      const result = await optimizeImage(imagePath);
      if (result) {
        results.push(result);
        totalOriginalSize += result.originalSize;
        totalSaved += (result.originalSize - result.optimizedSize);
      }
    }
    
    // Ordenar resultados por economia
    results.sort((a, b) => b.savings - a.savings);
    
    // Mostrar estatísticas
    console.log('\n===== Resultados da Otimização =====');
    console.log(`Total de imagens otimizadas: ${results.length}`);
    console.log(`Tamanho original total: ${totalOriginalSize.toFixed(2)} MB`);
    console.log(`Espaço economizado: ${totalSaved.toFixed(2)} MB (${(totalSaved / totalOriginalSize * 100).toFixed(2)}%)`);
    
    // Mostrar top 5 otimizações
    if (results.length > 0) {
      console.log('\nTop 5 otimizações:');
      for (let i = 0; i < Math.min(5, results.length); i++) {
        const r = results[i];
        console.log(`${i+1}. ${r.file}: ${r.originalSize.toFixed(2)} MB → ${r.optimizedSize.toFixed(2)} MB (${r.savings}% redução)`);
      }
    }
    
    console.log('\nOtimização concluída! Backups das imagens originais foram salvos nos diretórios "original-backup".');
  } catch (error) {
    console.error('Erro durante a otimização:', error);
  }
}

optimizeAllImages(); 