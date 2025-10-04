export class PizzaAgent {
  private cardapio = {
    pizzas: ['Margherita', 'Calabresa', 'Portuguesa', 'Quatro Queijos'],
    bebidas: ['Coca-Cola', 'Guaraná', 'Suco de Laranja'],
    sobremesas: ['Brownie', 'Pudim', 'Sorvete'],
  };

  generateResponse(input: string): string {
    const lower = input.toLowerCase();

    // Pergunta por sabores
    if (lower.includes('sabores') || lower.includes('quais pizzas')) {
      return `Temos ${this.cardapio.pizzas.join(', ')}. Posso te recomendar a Calabresa, que é uma das mais pedidas!`;
    }

    // Pedido de pizza
    const pizzaEscolhida = this.cardapio.pizzas.find((p) =>
      lower.includes(p.toLowerCase()),
    );
    if (pizzaEscolhida) {
      return `Ótima escolha! Deseja adicionar uma bebida gelada para acompanhar? Temos ${this.cardapio.bebidas.join(', ')}.`;
    }

    // Pedido de bebida
    const bebidaEscolhida = this.cardapio.bebidas.find((b) =>
      lower.includes(b.toLowerCase()),
    );
    if (bebidaEscolhida) {
      return `Perfeito! Para finalizar, posso te oferecer uma sobremesa? Temos ${this.cardapio.sobremesas.join(', ')}.`;
    }

    // Pedido de sobremesa
    const sobremesaEscolhida = this.cardapio.sobremesas.find((s) =>
      lower.includes(s.toLowerCase()),
    );
    if (sobremesaEscolhida) {
      return `Excelente escolha! Seu pedido está completo: ${sobremesaEscolhida} e o acompanhamento escolhido.`;
    }

    // Cliente indeciso
    if (lower.includes('não quero') || lower.includes('não sei')) {
      return `Entendo, mas que tal experimentar nossa Quatro Queijos especial? É cremosa e está saindo quentinha do forno!`;
    }

    // Resposta padrão
    return 'Posso te ajudar a escolher uma pizza deliciosa? Temos várias opções no cardápio!';
  }
}
