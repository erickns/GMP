# Protótipo Frontend v2 - Plataforma de Cálculo de Preços

## Descrição

Esta é a segunda versão do protótipo semi-funcional do frontend para a plataforma de cálculo de preços, desenvolvida com HTML, CSS e JavaScript puro. Esta versão apresenta uma estrutura mais modular, com páginas de login e dashboard separadas, e aprimoramentos na lógica de navegação e exibição de dados.

## Funcionalidades Implementadas

### 1. Sistema de Login
- **Página de Login dedicada:** `login.html`
- **Usuário:** admin
- **Senha:** admin
- Login fake com validação simulada e redirecionamento para o dashboard.

### 2. Dashboard
- **Página do Dashboard dedicada:** `dashboard.html`
- Visão geral com estatísticas dos produtos, insumos e cálculos
- Cards informativos com totais
- Ações rápidas para navegação
- Tabela de cálculos recentes

### 3. Gestão de Produtos/Serviços
- Listagem de produtos e serviços cadastrados
- Formulário para adicionar novos produtos/serviços
- Edição e exclusão de produtos existentes
- Categorização por tipo (produto/serviço)

### 4. Gestão de Insumos
- Listagem de insumos com custos e unidades de medida
- Formulário para cadastro de novos insumos
- Edição e exclusão de insumos
- Diferentes unidades de medida (kg, g, l, ml, un, m, cm)

### 5. Cálculos de Preço
- Dois tipos de cálculo:
  - **Produto (Comerciante):** Baseado no custo de aquisição
  - **Serviço/Produção:** Baseado em insumos e receitas
- Formulário dinâmico que se adapta ao tipo de cálculo
- Cálculo automático considerando:
  - Custos dos insumos
  - Mão de obra
  - Embalagem
  - Impostos (percentual)
  - Encargos fixos
  - Margem de lucro desejada
- Exibição detalhada da composição do preço final
- Histórico de cálculos realizados

### 6. Relatórios e Análises
- Estatísticas gerais (produto mais lucrativo, receita projetada, margem média)
- Análise de sensibilidade (simulada)
- Indicadores de impacto dos diferentes componentes do preço

## Estrutura de Arquivos

```
prototipo-frontend-v2/
├── login.html          # Página de login
├── dashboard.html      # Página principal do dashboard
├── styles.css          # Estilos e layout responsivo
├── data.js             # Dados mockados para simular o backend
├── login.js            # Lógica JavaScript para a página de login
├── dashboard.js        # Lógica JavaScript para a página do dashboard
└── README.md           # Este arquivo
```

## Como Usar

1. **Acesso:** Extraia o arquivo `prototipo-frontend-v2.zip`.
2. **Login:** Abra o arquivo `login.html` em um navegador web moderno.
3. **Credenciais:** Use as credenciais:
   - Usuário: `admin`
   - Senha: `admin`
4. **Navegação:** Após o login, você será redirecionado para o `dashboard.html`. Use o menu superior para navegar entre as seções.
5. **Teste das Funcionalidades:**
   - Explore o dashboard
   - Adicione novos produtos/serviços
   - Cadastre insumos
   - Realize cálculos de preço
   - Visualize relatórios

## Dados Mockados

O protótipo inclui dados de exemplo pré-carregados (ver `data.js` para detalhes).

## Funcionalidades Técnicas

### Responsividade
- Layout adaptável para desktop, tablet e mobile
- Menu de navegação responsivo
- Formulários otimizados para dispositivos móveis

### Interatividade
- Modais para formulários
- Validação de campos
- Feedback visual para ações do usuário
- Animações suaves

### Simulação de Backend
- Todas as operações CRUD são simuladas
- Dados persistem durante a sessão (via `localStorage` para o usuário logado)
- Delays simulados para operações assíncronas
- Validações de login

## Limitações do Protótipo

1. **Persistência:** Os dados (exceto o usuário logado) não são salvos entre sessões (recarregar a página reseta os dados).
2. **Validações:** Validações básicas apenas.
3. **Integração:** Não há integração com APIs reais.
4. **Segurança:** Login é apenas demonstrativo.
5. **Performance:** Não otimizado para grandes volumes de dados.

## Próximos Passos para Implementação

1. **Backend:** Implementar API REST em Java.
2. **Banco de Dados:** Configurar banco relacional.
3. **Autenticação:** Sistema real de login e autorização.
4. **Validações:** Implementar validações robustas.
5. **Testes:** Criar suite de testes automatizados.
6. **Deploy:** Configurar ambiente de produção.

## Tecnologias Utilizadas

- **HTML5:** Estrutura semântica
- **CSS3:** Estilos modernos com Flexbox e Grid
- **JavaScript ES6+:** Lógica da aplicação
- **Design Responsivo:** Mobile-first approach

## Compatibilidade

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Observações

Este protótipo serve como base para validação de conceito e demonstração das funcionalidades principais. Para uso em produção, será necessário implementar as camadas de backend, segurança e persistência adequadas.

