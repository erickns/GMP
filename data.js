// Dados mockados para simular o backend
const mockData = {
    user: {
        username: 'admin',
        password: 'admin',
        name: 'Admin'
    },
    produtos: [
        { id: 1, nome: 'Bolo de Chocolate', tipo: 'produto', categoria: 'Doces' },
        { id: 2, nome: 'Consultoria Financeira', tipo: 'servico', categoria: 'Consultoria' },
        { id: 3, nome: 'Torta de Morango', tipo: 'produto', categoria: 'Doces' },
        { id: 4, nome: 'Aula de Culinária', tipo: 'servico', categoria: 'Educação' },
        { id: 5, nome: 'Brigadeiro Gourmet', tipo: 'produto', categoria: 'Doces' }
    ],
    insumos: [
        { id: 1, nome: 'Farinha de Trigo', custo: 4.50, unidade: 'kg' },
        { id: 2, nome: 'Açúcar Cristal', custo: 3.20, unidade: 'kg' },
        { id: 3, nome: 'Ovos', custo: 0.50, unidade: 'un' },
        { id: 4, nome: 'Chocolate em Pó', custo: 8.90, unidade: 'kg' },
        { id: 5, nome: 'Leite', custo: 4.80, unidade: 'l' },
        { id: 6, nome: 'Manteiga', custo: 12.00, unidade: 'kg' },
        { id: 7, nome: 'Fermento em Pó', custo: 6.50, unidade: 'kg' },
        { id: 8, nome: 'Morango', custo: 8.00, unidade: 'kg' },
        { id: 9, nome: 'Creme de Leite', custo: 3.50, unidade: 'l' },
        { id: 10, nome: 'Embalagem Bolo', custo: 2.50, unidade: 'un' },
        { id: 11, nome: 'Embalagem Brigadeiro', custo: 0.15, unidade: 'un' },
        { id: 12, nome: 'Condensado', custo: 4.20, unidade: 'l' }
    ],
    calculos: [
        { 
            id: 1, 
            nome: 'Bolo de Chocolate Grande', 
            tipo: 'servico', 
            precoCalculado: 45.80, 
            data: '2024-06-08',
            custoTotal: 18.50,
            impostos: 2.30,
            encargos: 1.50,
            lucro: 23.50
        },
        { 
            id: 2, 
            nome: 'Consultoria 1h', 
            tipo: 'servico', 
            precoCalculado: 120.00, 
            data: '2024-06-07',
            custoTotal: 60.00,
            impostos: 12.00,
            encargos: 8.00,
            lucro: 40.00
        },
        { 
            id: 3, 
            nome: 'Torta de Morango', 
            tipo: 'servico', 
            precoCalculado: 52.30, 
            data: '2024-06-06',
            custoTotal: 22.80,
            impostos: 3.20,
            encargos: 2.00,
            lucro: 24.30
        },
        { 
            id: 4, 
            nome: 'Brigadeiro Gourmet (100un)', 
            tipo: 'servico', 
            precoCalculado: 85.00, 
            data: '2024-06-05',
            custoTotal: 35.00,
            impostos: 8.50,
            encargos: 6.50,
            lucro: 35.00
        },
        { 
            id: 5, 
            nome: 'Aula Culinária Básica', 
            tipo: 'servico', 
            precoCalculado: 80.00, 
            data: '2024-06-04',
            custoTotal: 25.00,
            impostos: 8.00,
            encargos: 7.00,
            lucro: 40.00
        },
        { 
            id: 6, 
            nome: 'Bolo Simples', 
            tipo: 'produto', 
            precoCalculado: 28.50, 
            data: '2024-06-03',
            custoTotal: 12.00,
            impostos: 2.85,
            encargos: 1.50,
            lucro: 12.15
        },
        { 
            id: 7, 
            nome: 'Torta Salgada', 
            tipo: 'servico', 
            precoCalculado: 38.90, 
            data: '2024-06-02',
            custoTotal: 16.50,
            impostos: 3.89,
            encargos: 2.00,
            lucro: 16.51
        },
        { 
            id: 8, 
            nome: 'Cupcake (12un)', 
            tipo: 'servico', 
            precoCalculado: 36.00, 
            data: '2024-06-01',
            custoTotal: 14.40,
            impostos: 3.60,
            encargos: 2.40,
            lucro: 15.60
        }
    ]
};

// Utilitários
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

