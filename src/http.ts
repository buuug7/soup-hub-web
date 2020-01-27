import to from "await-to-js";

/**
 * this compatibility with fetch http
 * @param url
 * @param options
 * @return [err, data]
 */
export function request(url: RequestInfo, options?: RequestInit): Promise<any> {
  const token = sessionStorage.getItem("token");

  const promise = new Promise((resolve, reject) => {
    fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...options?.headers
      }
    })
      .then(res => {
        const { status, statusText } = res;

        if (status >= 200 && status < 300) {
          return res;
        }

        throw new Error(statusText);
      })
      .then(res => res.json())
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });

  return to(promise);
}
