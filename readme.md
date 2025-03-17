## Desafio Huddle (To Do List)

- Descrição do Projeto

    O projeto consiste em um CRUD de lista de tarefas onde o usuário poderá:
        - Buscar todas as tarefas atreladas ao seu usuário;
        - Buscar uma tarefa específica atrelada ao seu usuário buscando por ID da tarefa;
        - Atualizar uma tarefa específica atrelada ao seu usuário;
        - Deletar uma tarefa específica atrelada ao seu usuário;

- Como rodar o projeto:

    - Instalar o git
    - Clonar o projeto: git clone git@github.com:soaares/desafio-huddle.git ou git clone https://github.com/soaares/desafio-huddle.git
    - Baixar o node.js v23.10.0: https://nodejs.org/pt/download
    - Instalar docker: https://docs.docker.com/desktop/setup/install/windows-install/
    - Instalar o postman para testar as rotas do projeto: https://www.postman.com/downloads/
        1. Após instalar o postman -> Clicar em import -> Clicar em files -> Ir até o caminho do projeto e selecionar o arquivo Desafio - Huddle.postman_collection.json
        2. Clicar em import novamente -> Ir até o caminho do projeto e selecionar o arquivo Huddle.postman_environment
    - Preencher as variáveis MONGO_INITDB_ROOT_USERNAME e MONGO_INITDB_ROOT_PASSWORD com usuário e senha que desejar
    - Renomear o arquivo .env.Example para .env e inserir as informações necessárias:
        - Inserir usuário e senha do banco em MONGO_URI
        - Inserir qualquer valor aleatório em SECRET_KEY para que seja usado na codificação/decodificação do password do usuário
        - Inserir em qual porta a aplicação irá rodar (padrão: 8000)
    - Rodar o comando no terminal: npm install
    - Rodar o comando no terminal: docker compose up
    - Rodar o comando no terminal: npm run build && npm start

- Regras de Negócio

    - Todos os usuários devem ter um acesso
    - As atividades criadas são atreladas ao usuário por meio do token enviado nas requisições
    - As atividades retornadas nos endpoints de consulta serão somentes as atividades referentes ao usuário logado
    - Atualização e deleção de atividades só serão executadas caso o id da atividade seja de seu pertencimento

- Como testar

    - Abrir o postman
    - Crie um usuário na rota na requisição: pasta Users -> Clicar na requisição Criar Usuário -> Clicar aba body e preencher os campos username e password -> Clicar em send
    - Em seguida faça login na rota: pasta Users -> Clicar na requisição Login de usuário -> Clicar na aba body e preencher os campos username e password com as mesmas informações que o usuário foi criado
    - Em seguida estará apto a utilizar qualquer rota da aplicação