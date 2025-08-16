# Estrutura de Contextos - Investment App

## Visão Geral

A aplicação agora utiliza dois contextos separados para melhor organização e responsabilidades distintas:

## 1. InvestmentsDataContext

**Localização:** `/src/contexts/InvestmentsDataContext.js`

**Responsabilidade:** Gerenciamento central dos dados de investimentos e operações de persistência.

### Funcionalidades:
- ✅ CRUD de investimentos (Create, Read, Update, Delete)
- ✅ Estado de loading dos dados
- ✅ Toggle de visibilidade dos valores
- ✅ Ordenação automática por data
- ⚠️ **Nota:** O carregamento dos dados é controlado externamente (no AssetLayout)

### Estado Gerenciado:
```javascript
{
  investments: [], // Array de investimentos
  isLoadingData: false, // Estado de carregamento
  isShowValues: true, // Visibilidade dos valores
}
```

### Funções Disponíveis:
```javascript
{
  loadInvestments, // Carrega dados do storage
  createInvestment, // Cria novo investimento
  updateInvestment, // Atualiza investimento existente
  removeInvestment, // Remove investimento
  toggleShowValues, // Alterna visibilidade
  setInvestments, // Define lista de investimentos
  setIsShowValues, // Define visibilidade
}
```

## 2. InvestmentsPageContext

**Localização:** `/src/contexts/InvestmentsPageContext.js`

**Responsabilidade:** Gerenciamento exclusivo dos estados específicos da interface da página de investimentos.

### Funcionalidades:
- ✅ Estados de modais e formulários
- ✅ Dados temporários de formulários
- ✅ Ações específicas da UI
- ⚠️ **Nota:** NÃO duplica dados do InvestmentsDataContext

### Estado Gerenciado:
```javascript
{
  // Estados de UI específicos da página
  isShowModal: false,
  isShowInvestmentForm: false,
  investmentFormAction: '', // 'create' | 'edit'

  // Dados temporários de formulários
  investmentFormData: {...},
  investmentModalData: {...},
  initialInvestmentFormData: {...},
}
```

### Funções Disponíveis:
```javascript
{
  // APENAS funções específicas da página
  toggleShowModal,
  toggleShowInvestmentForm,
  resetInvestmentFormData,
  setInvestmentFormData,
  setInvestmentFormAction,
  setInvestmentModalData,
  setIsShowModal,
}
```## 3. AssetLayout

**Localização:** `/src/app/asset/layout.js`

**Estrutura de Providers:**
```javascript
<InvestmentsDataProvider>     // Dados globais para todas as páginas /asset
  <AssetContent>              // Componente interno que carrega os dados
    <header>                  // Header comum com toggle local e títulos dinâmicos
      {/* Toggle de visibilidade e título baseado na rota */}
    </header>
    <main>
      {children}              // Páginas específicas (podem ter seus próprios providers)
    </main>
  </AssetContent>
</InvestmentsDataProvider>
```

### Funcionalidades do AssetLayout:
- ✅ Carregamento automático dos investimentos na inicialização
- ✅ Header comum com títulos dinâmicos
- ✅ Toggle de visibilidade local no header
- ✅ Controle do ciclo de vida dos dados

## 4. Página de Allocation

**Localização:** `/src/app/asset/allocation/page.js`

**Estrutura específica:**
```javascript
<InvestmentsPageProvider>     // Provider específico para funcionalidades da página
  <InvestmentsPageContent />  // Conteúdo da página com formulários e modais
</InvestmentsPageProvider>
```

## Vantagens desta Arquitetura

### 🎯 Separação de Responsabilidades
- **Dados:** InvestmentsDataContext foca apenas nos dados e persistência (compartilhado)
- **UI:** InvestmentsPageContext foca EXCLUSIVAMENTE nos estados da interface (sem duplicação)
- **Layout:** AssetLayout centraliza o header comum com estado próprio

### 🚀 Performance
- Carregamento automático dos dados no nível do layout
- Compartilhamento eficiente de dados entre páginas irmãs
- Re-renders otimizados por contexto
- Provider específico apenas onde necessário
- **Sem duplicação de dados** entre contextos

### 🔧 Manutenibilidade
- Fácil extensão para novas páginas na seção `/asset`
- Contextos independentes e testáveis
- Redução de código duplicado
- Estados de UI isolados por página
- **Princípio DRY** - Don't Repeat Yourself aplicado

### 📱 Escalabilidade
- InvestmentsDataContext reutilizável em outras seções
- Páginas podem ter seus próprios providers específicos
- Flexibilidade para diferentes layouts
- Títulos dinâmicos baseados em rotas

### 🎨 Consistência Visual
- Interface padronizada entre todas as páginas `/asset`
- Toggle de visibilidade sempre disponível
- Títulos apropriados para cada página

## Como Usar

## Como Usar

### Em páginas de estatísticas (/asset):
```javascript
import { useInvestmentsData } from '@/contexts/InvestmentsDataContext';

// Acesso direto aos dados sem estados de UI
const { investments, isLoadingData, isShowValues } = useInvestmentsData();
```

### Em páginas com funcionalidades específicas (/asset/allocation):
```javascript
import { useInvestmentsData } from '@/contexts/InvestmentsDataContext';
import { useInvestmentsPage } from '@/contexts/InvestmentsPageContext';

// Dados dos investimentos
const { investments, isLoadingData, createInvestment } = useInvestmentsData();

// Estados específicos da página
const { isShowModal, toggleShowModal } = useInvestmentsPage();
```

### Em componentes que precisam de ambos os contextos:
```javascript
import { useInvestmentsData } from '@/contexts/InvestmentsDataContext';
import { useInvestmentsPage } from '@/contexts/InvestmentsPageContext';

// Separação clara: dados vs UI
const { isShowValues, removeInvestment } = useInvestmentsData();
const { toggleShowModal, setInvestmentFormData } = useInvestmentsPage();
```

### Em componentes que precisam apenas dos dados:
```javascript
import { useInvestmentsData } from '@/contexts/InvestmentsDataContext';

// Acesso direto aos dados sem estados de UI
const { investments, isLoadingData, createInvestment } = useInvestmentsData();
```

### Em outros layouts que precisam apenas dos dados:
```javascript
<InvestmentsDataProvider>
  {/* Outros providers específicos */}
  {children}
</InvestmentsDataProvider>
```
