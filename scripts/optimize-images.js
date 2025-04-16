const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Definindo diretório das imagens e destino
const imageDir = path.join(__dirname, '../public/images/before-after');
const outputDir = path.join(__dirname, '../public/images/before-after/optimized');

// Garantir que o diretório de saída exista
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

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

// Otimizar imagens
async function optimizeImages() {
  try {
    // Listar arquivos no diretório
    const files = fs.readdirSync(imageDir);
    
    console.log(`Encontrados ${files.length} arquivos para otimizar.`);
    
    for (const file of files) {
      // Pular diretórios ou arquivos que não são imagens pelo nome
      if (!file.match(/\.(jpg|jpeg|png)$/i) || file === 'optimized') {
        console.log(`Pulando ${file} (não é uma imagem ou é um diretório)`);
        continue;
      }
      
      const inputPath = path.join(imageDir, file);
      const outputPath = path.join(outputDir, file);
      
      // Verificar se é um arquivo 
      const stats = fs.statSync(inputPath);
      if (!stats.isFile()) {
        console.log(`Pulando ${file} (não é um arquivo)`);
        continue;
      }
      
      // Verificar se é uma imagem válida
      if (!isValidImage(inputPath)) {
        console.log(`Pulando ${file} (não é uma imagem válida)`);
        continue;
      }
      
      try {
        // Obter tamanho do arquivo original em MB
        const originalSize = stats.size / (1024 * 1024);
        
        console.log(`Processando ${file} (${originalSize.toFixed(2)} MB)...`);
        
        // Processar a imagem
        await sharp(inputPath)
          .resize({ 
            width: config.width, 
            height: null, 
            fit: 'inside',
            withoutEnlargement: true 
          })
          .jpeg({ quality: config.quality })
          .toFile(outputPath);
        
        // Obter tamanho do arquivo otimizado em MB
        const optimizedSize = fs.statSync(outputPath).size / (1024 * 1024);
        
        // Calcular economia de tamanho
        const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(2);
        
        console.log(`✅ ${file}: ${originalSize.toFixed(2)} MB → ${optimizedSize.toFixed(2)} MB (${savings}% redução)`);
      } catch (error) {
        console.error(`❌ Erro ao otimizar ${file}:`, error.message);
      }
    }
    
    console.log('Otimização concluída!');
  } catch (error) {
    console.error('Erro durante a otimização:', error);
  }
}

optimizeImages(); 