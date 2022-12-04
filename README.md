# crud em prisma / node js - controle de atividades físicas

esse projeto é meramente para ilustrar o uso do prisma com o node js

https://www.prisma.io/docs/concepts/database-connectors/mysql
https://nodejs.org/en/

# recursos usados:
- prisma (O.R.M.)
- nodemon
- sucrase
- express

# recursos instalados (repositórios):
https://github.com/prisma/prisma
https://github.com/remy/nodemon
https://github.com/alangpierce/sucrase
https://github.com/expressjs/express


step by step:
- criar o package.json
npm init -y


- instalar as dependências de desenvolvimento:
yarn add sucrase nodemon prisma -D


- instalar o express:
yarn add express


- configurar o script de inicialização em dev com o nodemon
"scripts": {
    "start": "nodemon src/server.js"
  },


- configurar o nodemon para usar o sucrase:
criar na raiz do projeto o arquivo nodemon.json  
{
    "execMap": {
        "js": "node -r sucrase/register"
    }
}


- start server:
yarn start


- criar o arquivo de configuração do prisma:
yarn prisma init


- configurar o prima (./prisma/schema.prisma) para usar o gerenciador de banco de dados escolhido
vide: https://www.prisma.io/docs/concepts/database-connectors/sqlite:

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

ou 

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

no arquivo .env, informar os detalhes de acesso ao banco de dados (para sqlite isso não é necessário)
exemplo (mysql): 
DATABASE_URL="mysql://root:root@127.0.0.1/prisma_crud?connection_limit=5&socket_timeout=5"


- criar a tabela através do prisma (inserir no arquivo schema.prisma):
vide exemplos: https://www.prisma.io/docs/concepts/components/prisma-schema/data-model


- instalar extensões do vscode para formatação dos arquivos prisma:
Prisma (by Prisma)
Prisma - Insider (by Prisma)


- criar as tabelas:
yarn prisma migrate dev
(inserir o nome da migrate)


- acessar o prisma studio
source: https://www.prisma.io/studio
yarn prisma studio

