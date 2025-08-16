# Supabase ENUM Management Documentation

Este arquivo contém documentação e exemplos para trabalhar com ENUMs no PostgreSQL/Supabase no contexto da aplicação de investimentos.

## Visão Geral

ENUMs no PostgreSQL são tipos de dados que permitem definir um conjunto fixo de valores válidos para uma coluna. São úteis para campos como categorias de investimento, status, tipos, etc.

## Funções e Comandos

### 1. Consultar Valores de um ENUM

#### Método Direto (PostgreSQL)
```sql
select enum_range(null::category);
```

Este comando retorna todos os valores possíveis do ENUM `category` como um array.

#### Função Personalizada para Reutilização

```sql
create or replace function get_enum_values(enum_name text)
returns text[]
language sql
as $$
  select array_agg(e.enumlabel order by e.enumsortorder)
  from pg_type t
  join pg_enum e on t.oid = e.enumtypid
  where t.typname = enum_name;
$$;
```

**Descrição da Função:**
- **Nome:** `get_enum_values`
- **Parâmetro:** `enum_name` (text) - nome do ENUM a ser consultado
- **Retorno:** `text[]` - array com todos os valores do ENUM
- **Ordenação:** Os valores são retornados ordenados por `enumsortorder`

### 2. Uso no Frontend (JavaScript/Supabase)

```javascript
let { data: categories } = await supabase.rpc("get_enum_values", { enum_name: "category" });
```

**Como usar:**
- `supabase.rpc()` chama a função personalizada criada no banco
- O parâmetro `enum_name` deve corresponder ao nome exato do ENUM no banco
- O resultado é um array de strings com os valores do ENUM

## Casos de Uso na Aplicação

### Categorias de Investimento

Se você tem um ENUM `category` com valores, você pode usar a função para popular dropdowns, validações, etc.

### Exemplo Prático

```javascript
// Buscar categorias disponíveis
async function loadInvestmentCategories() {
  try {
    const { data: categories, error } = await supabase.rpc("get_enum_values", {
      enum_name: "category"
    });

    if (error) throw error;

    return categories;
  } catch (error) {
    console.error('Erro ao carregar categorias:', error);
    return [];
  }
}

// Usar no componente React
const [categories, setCategories] = useState([]);

useEffect(() => {
  loadInvestmentCategories().then(setCategories);
}, []);
```

## Estrutura das Tabelas do Sistema

Este sistema parece usar ENUMs para:
- **category**: Categorias de investimentos
- Potencialmente outros ENUMs para status, tipos, etc.

## Benefícios dos ENUMs

1. **Validação Automática**: O banco garante que apenas valores válidos sejam inseridos
2. **Performance**: ENUMs são mais eficientes que strings para valores fixos
3. **Consistência**: Previne typos e garante padronização
4. **Documentação**: Os valores possíveis ficam explícitos no schema

## Melhores Práticas

1. **Naming Convention**: Use nomes descritivos para os ENUMs
2. **Ordenação**: Defina uma ordem lógica para os valores
3. **Migrações**: Seja cuidadoso ao alterar ENUMs em produção
4. **Frontend**: Cache os valores dos ENUMs para melhor performance

## Comandos Úteis para Desenvolvimento

```sql
-- Listar todos os ENUMs do banco
SELECT t.typname as enum_name, e.enumlabel as enum_value
FROM pg_type t
JOIN pg_enum e on t.oid = e.enumtypid
ORDER BY t.typname, e.enumsortorder;

-- Verificar valores de um ENUM específico
SELECT enumlabel FROM pg_enum WHERE enumtypid = 'category'::regtype ORDER BY enumsortorder;
```
