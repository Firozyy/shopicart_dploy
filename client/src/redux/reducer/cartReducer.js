
export const cartReducer = (state = { cartItems: [],shippingAddress:{} ,paymentMethod:{}}, action) => {
    switch (action.type) {
        case "CART_ADD_ITEM":

            const item = action.payload

            const itemExist = state.cartItems.find(e => e.product === item.product);
            if (itemExist) {
                return {
                    ...state,
                     cartItems: state.cartItems.map(e => e.product === itemExist.product ? item : e)
                }
            }
            return {
                ...state, cartItems: [...state.cartItems, item]
            }
            case "REMOVE_ITEM":
                return {
                    ...state,
                     cartItems: state.cartItems.filter( x => x.product !== action.payload )
                }

                case "CART_SHIPPING_ADDRESS_SAVE":
                    return {
                        ...state,
                        shippingAddress: action.payload 
                    }
                    case " CART_PAYMENT_METHOD_SAVE":
                        return {
                            ...state,
                            paymentMethod: action.payload 
                        }
        
                   
        default:
            return state
    }
};