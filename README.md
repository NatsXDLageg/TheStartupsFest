# TheStartupsFest - Desafio Front-End

## introdução

O projeto The Startups Fest é uma aplicação web destinada a ser utilizada em um evento de startUps, para que o público possa classificar em três categorias as startUps participantes: proposta, apresentação e desenvolvimento.

É possível visualizar as startUps com maior pontuação para cada categoria

## Execução

Essa aplicação foi desenvolvida a fim de seruma solução Front-End, e por isso não depende de servidor para rodar.

Basta executar o arquivo index.html e a aplicação será iniciada no navegador web padrão.

Na primeira execução, a aplicação demora no carregamento, visto que a primeira vez que os dados das startUps são carregados é demorada.

## Especificações

A aplicação foi desenvolvida utilizando os frameworks Vue.js e Apollo, e a aplicação Google Firebase para armazenar os dados de avaliação dos usuários.

### Solução de problemas

Duas medidas foram adotadas, de forma a atender o requisito de a aplicação não precisar de autenticação para ser utilizada (é de interesse que o usuário não precise se cadastrar para utilizar a aplicação, para tornar o uso mais rápido e agradável):

- A base de dados do Google Firebase utilizada é aberta, e não precisa de autenticação para ser utilizada, o que indica que qualquer um pode acessá-la, ler e gravar dados. Dessa forma, não é necessário autenticar-se para utilizar o sistema;

- Para permitir que um usuário não avalie mais de uma vez a mesma StartUp, foi utilizado o _local storage_ do javascript para armazenar um _user token_ gerado para o usuário. Dessa forma, mesmo se o usuário sair e entrar novamente no site, suas avaliações serão mantidas.

