# MyTasks

MyTasks foi construído para simplificar o gerenciamento de tarefas e a produtividade.

## 📦 Backend

### 👨‍💻 Tech Stack:

- **NestJS**: Um framework progressivo para criação de servidores eficientes e escaláveis em Node.js.
- **JSON Web Token (JWT)**: Para autenticação e autorização de forma segura.
- **Prisma + MySQL 8**: Um ORM moderno para Node.js e TypeScript, utilizado para o banco de dados principal da aplicação.
- **bcrypt**: Para hashing e comparação segura de senhas.
- **Mongoose**: Uma solução Schema-Based para modelar o banco de dados da aplicação, utilizado para armazenar logs de operação (adicionar, editar e remover tasks).
- **Nodemailer**: Para envio de e-mails.

## 📦 Front-End

### 👨‍💻 Tech Stack:

- **React**: Biblioteca JavaScript para construção de interfaces de usuário interativas e reativas.
- **Tailwind CSS**: Framework CSS para estilização rápida e responsiva.
- **React Router**: Roteamento e navegação entre páginas da aplicação.
- **React Icons**: Biblioteca para importação de icones simplificados.

## 🔧 Iniciando o Projeto:

⚠️ Este projeto usa Docker e Docker Compose para a containerização. Certifique-se de ter o <a href="https://www.docker.com/">Docker</a> instalado na sua máquina.

Clone esse repositório:
```bash
$ git clone https://github.com/joaopugsley/mytasks.git
```
Acesse o diretório da aplicação:
```bash
$ cd mytasks
```
Acesse o diretório onde os ``scripts`` da aplicação estão armazenados:
```bash
$ cd scripts
```

### Localmente

⚠️ Lembre-se de configurar as variáveis de ambiente locais editando ou criando o arquivo ``.env.local``

Faça o build da aplicação através do script de build *(isso só precisa ser realizado uma vez)*
```bash
$ ./build.sh
```
Suba os containers em ambiente de desenvolvimento:
```bash
$ ./up.sh
```

### Em Produção

⚠️ Lembre-se de configurar as variáveis de ambiente de produção editando ou criando o arquivo ``.env``

Faça o build da aplicação através do script de build *(isso só precisa ser realizado uma vez)*
```bash
$ ./build-prod.sh
```
Suba os containers em ambiente de produção:
```bash
$ ./up-prod.sh
```

## 📃 Scripts Extra:

⚠️ Todos os scripts estão localizados dentro da pasta <a href="https://github.com/joaopugsley/mytasks/tree/master/scripts">scripts</a>.

- **Report**: Script responsável por gerar relatórios da aplicação em formato ``.csv`` e armazenar no formato ``dd-mm-YYYY`` dentro da pasta <a href="https://github.com/joaopugsley/mytasks/tree/master/datareport/reports">reports</a>.
```bash
$ ./report.sh
```
- **Backup**: Script responsável por **gerar** & **compactar** backups do banco de dados da aplicação através da ``CLI`` do <a href="https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html">mysqldump</a>.
```bash
$ ./backup.sh
```


🕓 Execução de scripts pode ser automatizada em muitos sistemas **UNIX** através de **Cron Jobs**.

Abra o arquivo onde os **Cron Jobs** ficam armazenados:
```bash
$ crontab -e
```
Adicione uma nova linha seguindo o padrão a seguir:
```bash
0 0 * * * /dev/mytasks/scripts/backup.sh
```
Na linha acima definimos um **Cron Job** para ser executado todo dia ``00:00``

⚠️ Lembre-se de alterar o caminho para o script de acordo com sua instalação.