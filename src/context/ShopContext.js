"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import { calculateTotals } from "@/utils/price";

const STORAGE_KEY = "myundiyal-shop-state";

const defaultSavedAddresses = [
  {
    id: "vijay",
    label: "Vijay",
    street: "Flat 12B, Third Floor, Sai Residency Apartments, Near Green Park Signal",
    city: "Chennai",
    iconType: "navigation",
  },
  {
    id: "work",
    label: "Work",
    street: "23, Lake View Road Anna Nagar West",
    city: "Chennai",
    iconType: "briefcase",
  },
  {
    id: "home",
    label: "Home",
    street: "23, Lake View Road Anna Nagar West",
    city: "Chennai",
    iconType: "house",
  },
];

const defaultState = {
  cart: [],
  coupon: null,
  paymentType: "weekly",
  scheme: null,
  savedAddresses: defaultSavedAddresses,
  selectedAddressId: "vijay",
  address: {
    street:
      "Flat 12B, Third Floor, Sai Residency Apartments, Near Green Park Signal",
    city: "Chennai",
  },
};

function shopReducer(state, action) {
  switch (action.type) {
    case "HYDRATE": {
      return {
        ...state,
        ...action.payload,
      };
    }
    case "ADD_TO_CART": {
      const product = action.payload;
      const existingItem = state.cart.find((item) => item.id === product.id);

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
          ),
        };
      }

      return {
        ...state,
        cart: [
          ...state.cart,
          {
            id: product.id,
            name: product.name,
            shortName: product.shortName,
            image: product.image,
            price: product.price,
            oldPrice: product.oldPrice,
            qty: 1,
            schemePreview: product.schemePreview,
            deliveryText: product.deliveryText,
          },
        ],
      };
    }
    case "REMOVE_FROM_CART": {
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    }
    case "INCREMENT_QTY": {
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload ? { ...item, qty: item.qty + 1 } : item,
        ),
      };
    }
    case "DECREMENT_QTY": {
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === action.payload ? { ...item, qty: item.qty - 1 } : item,
          )
          .filter((item) => item.qty > 0),
      };
    }
    case "SET_COUPON": {
      return {
        ...state,
        coupon: action.payload,
      };
    }
    case "CLEAR_COUPON": {
      return {
        ...state,
        coupon: null,
      };
    }
    case "SET_PAYMENT_TYPE": {
      return {
        ...state,
        paymentType: action.payload,
      };
    }
    case "SET_SCHEME": {
      return {
        ...state,
        scheme: action.payload,
      };
    }
    case "UPDATE_ADDRESS": {
      return {
        ...state,
        selectedAddressId: null,
        address: {
          ...state.address,
          ...action.payload,
        },
      };
    }
    case "ADD_SAVED_ADDRESS": {
      const nextAddress = action.payload;
      if (!nextAddress || !nextAddress.id) {
        return state;
      }

      const nextSavedAddresses = [nextAddress, ...state.savedAddresses];

      return {
        ...state,
        savedAddresses: nextSavedAddresses,
        selectedAddressId: nextAddress.id,
        address: {
          street: nextAddress.street,
          city: nextAddress.city,
        },
      };
    }
    case "SELECT_SAVED_ADDRESS": {
      const selected = state.savedAddresses.find(
        (item) => item.id === action.payload,
      );

      if (!selected) {
        return state;
      }

      return {
        ...state,
        selectedAddressId: selected.id,
        address: {
          street: selected.street,
          city: selected.city,
        },
      };
    }
    case "UPDATE_SAVED_ADDRESS": {
      const { id, patch } = action.payload || {};

      if (!id || !patch || typeof patch !== "object") {
        return state;
      }

      let updatedAddress = null;
      const nextSavedAddresses = state.savedAddresses.map((item) => {
        if (item.id !== id) {
          return item;
        }

        updatedAddress = {
          ...item,
          ...patch,
        };

        return updatedAddress;
      });

      if (!updatedAddress) {
        return state;
      }

      return {
        ...state,
        savedAddresses: nextSavedAddresses,
        address:
          state.selectedAddressId === id
            ? {
                street: updatedAddress.street,
                city: updatedAddress.city,
              }
            : state.address,
      };
    }
    case "DELETE_SAVED_ADDRESS": {
      const id = action.payload;
      const nextSavedAddresses = state.savedAddresses.filter(
        (item) => item.id !== id,
      );

      const wasSelected = state.selectedAddressId === id;
      const fallbackSelected = nextSavedAddresses[0] || null;

      return {
        ...state,
        savedAddresses: nextSavedAddresses,
        selectedAddressId: wasSelected ? fallbackSelected?.id || null : state.selectedAddressId,
        address:
          wasSelected && fallbackSelected
            ? {
                street: fallbackSelected.street,
                city: fallbackSelected.city,
              }
            : state.address,
      };
    }
    case "CLEAR_CART": {
      return {
        ...state,
        cart: [],
      };
    }
    case "RESET_CHECKOUT": {
      return {
        ...defaultState,
      };
    }
    default:
      return state;
  }
}

const ShopContext = createContext(null);

function getPersistedState() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY);
    if (!rawValue) {
      return null;
    }

    const parsed = JSON.parse(rawValue);
    if (!parsed || typeof parsed !== "object") {
      return null;
    }

    return {
      ...defaultState,
      ...parsed,
    };
  } catch {
    return null;
  }
}

export function ShopProvider({ children }) {
  const [state, dispatch] = useReducer(shopReducer, defaultState);
  const isHydratedRef = useRef(false);

  useEffect(() => {
    const persistedState = getPersistedState();

    if (persistedState) {
      dispatch({ type: "HYDRATE", payload: persistedState });
    }

    isHydratedRef.current = true;
  }, []);

  useEffect(() => {
    if (!isHydratedRef.current || typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const totals = useMemo(
    () => calculateTotals(state.cart, state.coupon),
    [state],
  );

  const value = useMemo(
    () => ({
      ...state,
      ...totals,
      addToCart: (product) =>
        dispatch({ type: "ADD_TO_CART", payload: product }),
      removeFromCart: (productId) =>
        dispatch({ type: "REMOVE_FROM_CART", payload: productId }),
      incrementQty: (productId) =>
        dispatch({ type: "INCREMENT_QTY", payload: productId }),
      decrementQty: (productId) =>
        dispatch({ type: "DECREMENT_QTY", payload: productId }),
      setCoupon: (coupon) => dispatch({ type: "SET_COUPON", payload: coupon }),
      clearCoupon: () => dispatch({ type: "CLEAR_COUPON" }),
      setPaymentType: (paymentType) =>
        dispatch({ type: "SET_PAYMENT_TYPE", payload: paymentType }),
      setScheme: (scheme) => dispatch({ type: "SET_SCHEME", payload: scheme }),
      addSavedAddress: (addressInput) => {
        const street = addressInput?.street?.trim();
        const city = addressInput?.city?.trim();
        const label = addressInput?.label?.trim() || "New";

        if (!street || !city) {
          return;
        }

        dispatch({
          type: "ADD_SAVED_ADDRESS",
          payload: {
            id: `addr-${Date.now()}`,
            label,
            street,
            city,
            iconType: addressInput?.iconType || "house",
          },
        });
      },
      selectSavedAddress: (id) =>
        dispatch({ type: "SELECT_SAVED_ADDRESS", payload: id }),
      updateSavedAddress: (id, patch) =>
        dispatch({ type: "UPDATE_SAVED_ADDRESS", payload: { id, patch } }),
      deleteSavedAddress: (id) =>
        dispatch({ type: "DELETE_SAVED_ADDRESS", payload: id }),
      updateAddress: (addressPatch) =>
        dispatch({ type: "UPDATE_ADDRESS", payload: addressPatch }),
      clearCart: () => dispatch({ type: "CLEAR_CART" }),
      resetCheckout: () => dispatch({ type: "RESET_CHECKOUT" }),
    }),
    [state, totals],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("useShop must be used inside ShopProvider");
  }

  return context;
}
