## Goomer Lista Rango

Este projeto é parte de um teste técnico encontrado no GitHub da empresa Goomer, ainda não tive o prazer de participar do processo seletivo interno deles e aproveitei o desafio para aumentar meu conhecimento e enriquecer o portfólio.

## Desafios/Problemas

Durante a execução deste projeto, enfrentei alguns desafios significativos:

1. **Configuração do ambiente de banco de dados**: Foi necessário manter duas configurações de banco de dados, uma para produção e outra para o ambiente de testes.

2. **Upload de imagens**: A aplicação exigia upload de imagens, optei por salvar localmente assim otimizando o tempo de desenvolvimento, tempo de resposta e economizar com serviços de armazenamento.

## Decisões de Projeto

Para resolver o desafio promovendo melhor desenvolviment, usabilidade, escalabilidade e colaboração, foram tomadas as seguintes decisões:

1. **Tecnologias Utilizadas**:
   - **Node.js**: Escolhi Node.js por ser uma tecnologia que tenho mais experiência e à sua ampla utilização pela empresa que propôs o desafio.
   - **Express**: Express é uma das melhores ferramentas para desenvolvimente de aplicação server-side em Node.js, permitindo flexibilidade arquitetural ao time de desenvolvimento.
   - **PGlite**: Escolhei PGlite por sua leveza e adequação às necessidades do projeto, evitando a complexidade adicional de gerenciar serviços de banco de dados ou containers.
   - **FS (File System)**: Utilizei o módulo FS nativo do Node.js para salvar as imagens localmente, evitando o uso de serviços externos.
2. **Escolha de Arquitetura**: Optei por utilizar Clean Architecture por ser uma arquitetura simples e muito eficiente na manutenção e escalabilidade da aplicação.

## Melhorias Futuras

Pretendo implementar as seguintes melhorias no projeto:

- [ ] **Autenticação e Autorização**: Implementar autenticação e autorização para proteger as rotas da aplicação.
- [ ] **Testes End-to-End**: Implementar testes End-to-End para garantir o correto funcionamento da aplicação de "ponta a ponta".
- [ ] **Microserviços**: Dividir a aplicação em microserviços para facilitar a manutenção e escalabilidade.

## Instruções para Execução

Para executar esta aplicação, siga as instruções abaixo:

1. **Clone o repositório**: 

```bash
git clone https://github.com/mucasliranda/goomer-lista-rango.git
```

2. **Instale as dependências**:

```bash
npm install
```

3. **Configure o ambiente**

Copie o arquivo .env.example para .env e preencha as variáveis de ambiente. (opcional)

4. **Execute a aplicação**:

```bash
npm start
```

A aplicação estará disponível em http://localhost:3000 ou na porta especificada no arquivo `.env`.


Para executar os testes, use o comando

```bash
npm test
```

Para executar os testes de cobertura, use o comando

```bash
npm run test:coverage
```

## Docker

Se preferir, você pode executar a aplicação usando Docker. Para isso, siga as instruções abaixo:

1. **Construa a imagem**:

```bash
docker compose build
```

2. **Execute o container**:

```bash
docker compose up 
```
