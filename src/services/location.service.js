const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/reverse";

export async function reverseGeocode(latitude, longitude) {
  const fallback = {
    label: "Current Location",
    street: `Lat ${latitude.toFixed(5)}, Lng ${longitude.toFixed(5)}`,
    city: "Live Location",
  };

  try {
    const response = await fetch(
      `${NOMINATIM_BASE_URL}?format=jsonv2&lat=${latitude}&lon=${longitude}`,
    );

    if (!response.ok) {
      return fallback;
    }

    const data = await response.json();
    const address = data.address || {};

    const lineOneParts = [
      address.house_number,
      address.road || address.pedestrian || address.neighbourhood,
    ].filter(Boolean);

    const cityParts = [
      address.suburb || address.village || address.town || address.city,
      address.state,
    ].filter(Boolean);

    return {
      label: "Current Location",
      street: lineOneParts.length > 0 ? lineOneParts.join(", ") : fallback.street,
      city: cityParts.length > 0 ? cityParts.join(", ") : fallback.city,
      displayName: data.display_name || fallback.street,
    };
  } catch {
    return fallback;
  }
}

export function getCurrentPosition(options) {
  return new Promise((resolve, reject) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}
