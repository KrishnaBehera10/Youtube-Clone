export const YtAPI = import.meta.env.VITE_API_KEY;

export function view(vale) {
  if (vale > 1000000) {
    return Math.floor(vale / 1000000) + "M views";
  } else if (vale > 1000) {
    return Math.floor(vale / 1000) + "K views";
  } else {
    return vale + " views";
  }
}

export function like(vale) {
  if (vale > 1000) {
    return Math.floor(vale / 1000) + "K";
  } else {
    return vale;
  }
}

export function comments(value) {
  if (value > 1000) {
    return Math.floor(value / 1000) + "K";
  } else {
    return value;
  }
}
export function subcribecount(value) {
  if (value > 1000000) {
    return Math.floor(value / 1000000) + "M";
  } else if (value > 100000) {
    return Math.floor(value / 1000) + "K";
  } else {
    return value;
  }
}
