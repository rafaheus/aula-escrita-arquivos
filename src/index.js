const express = require('express');
const fs = require('fs/promises');

const app = express();

app.use(express.json());

// dessa forma sobrescreve o arquivo a.txt
// app.get('/', async (req, res) => {
//     const texto = 'olá';
//     await fs.writeFile('./src/a.txt', texto)
//     res.json('ok');
// });

// tem q mudar de a.txt para b.txt, dessa forma é criado um novo arquivo.txt
// app.get('/', async (req, res) => {
//     const texto = 'tudo bem?';
//     await fs.writeFile('./src/b.txt', texto)
//     res.json('ok');
// });


app.get('/', async (req, res) => {
     const texto = 'olá';
     await fs.writeFile('./src/a.txt', texto)
    res.json('ok');
 });

app.post('/', async (req, res) => {
    const { nome, idade } = req.body;

    try {
        const teste = await fs.readFile('./src/usuarios.json');

        const testeParse = JSON.parse(teste);
    
        testeParse.push({nome, idade});
    
        const testeStringify = JSON.stringify(testeParse);
    
        await fs.writeFile('./src/usuarios.json', testeStringify)
    
        return res.json('Pessoa cadastrada com sucesso');
    } catch (erro) {
        return res.json(`Deu erro: ${erro.message}`)
    } finally {
        console.log('isso sempre será executado')
    }
});

app.listen(3000);