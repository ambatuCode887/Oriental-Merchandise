interface Price {
    $numberDecimal: string;
    shippingPrice: number;
    combinePrice: number;
  }
  
  interface Dimension {
    size: string;
    height_cm: number;
    length_cm: number;
    width_cm: number;
    price: Price;
  }

  
  
  export function calculatePrice(selectedSize: string, quantity: number, merchandise: any): number {
    const selectedDimension = merchandise.dimensions_per_quantity.size.find((dimension: Dimension) => dimension.size === selectedSize);
    if (selectedDimension) {
      const price = selectedDimension.price.combinePrice;
      return price * quantity;
    } else {
      return 0;
    }
  }