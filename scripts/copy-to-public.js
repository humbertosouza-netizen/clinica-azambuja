const fs = require('fs');
const path = require('path');

// Diretórios de origem e destino
const sourceDir = path.join(__dirname, '../public/images/before-after/optimized');
const targetDir = path.join(__dirname, '../public/images/before-after');
const backupDir = path.join(__dirname, '../public/images/before-after/original-backup');

// Garantir que o diretório de backup exista
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
  console.log('✅ Diretório de backup criado.');
}

// Função para substituir as imagens
async function replaceImages() {
  try {
    // Verificar se o diretório de imagens otimizadas existe
    if (!fs.existsSync(sourceDir)) {
      console.error('❌ Diretório de imagens otimizadas não encontrado!');
      return;
    }

    // Listar imagens otimizadas
    const optimizedFiles = fs.readdirSync(sourceDir);
    console.log(`Encontradas ${optimizedFiles.length} imagens otimizadas.`);

    // Contador para estatísticas
    let processed = 0;

    for (const file of optimizedFiles) {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);
      const backupPath = path.join(backupDir, file);
      
      // Verificar se o arquivo existe no diretório original
      if (fs.existsSync(targetPath)) {
        // Verificar se já não está no backup
        if (!fs.existsSync(backupPath)) {
          // Fazer backup do arquivo original
          fs.copyFileSync(targetPath, backupPath);
          console.log(`📦 Backup criado: ${file}`);
        }
        
        // Substituir pelo arquivo otimizado
        fs.copyFileSync(sourcePath, targetPath);
        processed++;
        console.log(`🔄 Substituído: ${file}`);
      } else {
        console.log(`⚠️ Arquivo não encontrado no diretório original: ${file}`);
      }
    }

    console.log(`\n✅ Concluído! ${processed} imagens foram substituídas.`);
    console.log(`📂 As imagens originais foram salvas em: ${backupDir}`);
  } catch (error) {
    console.error('Erro durante substituição das imagens:', error);
  }
}

replaceImages(); 