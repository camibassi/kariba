const formatMoney = (value) => new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

const formatDate = (item = new Date()) => new Date(item).toLocaleString('pt-BR', { 
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
});

export {
    formatMoney,
    formatDate
}