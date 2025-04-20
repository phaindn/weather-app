let promise: Promise<GeolocationCoordinates> | null = null;
let lastCall = 0;
export function getCurrentPosition({
  enableHighAccuracy = true,
  timeout = 5000,
  maximumAge = 0,
}: PositionOptions = {}) {
  if (promise && Date.now() - lastCall < 2000) {
    return promise;
  }
  lastCall = Date.now();
  promise = new Promise<GeolocationCoordinates>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(pos => {
      promise = null;
      lastCall = 0;
      resolve(pos.coords);
    }, err => {
      promise = null;
      lastCall = 0;
      reject(err);
    }, {
      enableHighAccuracy,
      maximumAge,
      timeout,
    });
  });

  return promise;
}
