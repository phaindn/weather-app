
export function getCurrentPosition({
  enableHighAccuracy = true,
  timeout = 5000,
  maximumAge = 0,
}: PositionOptions) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(pos => {
      resolve(pos.coords);
    }, err => {
      reject(err);
    }, {
      enableHighAccuracy,
      maximumAge,
      timeout,
    });
  })
}
