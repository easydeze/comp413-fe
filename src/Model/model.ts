/**
 * Wrapper around fetch to return a Promise that resolves to the desired
 * type. This function does not validate whether the response actually
 * conforms to that type.
 *
 * @param url         url to fetch from
 * @param options     fetch options
 * @param validSchema schema on which the response will be validated against
 * @returns           a Promise that resolves to the unmarshaled JSON response
 * @throws            an error if the fetch fails, there is no response body,
 *                    or the response is not valid JSON
 */

/* typedFetch fetches a resources from the url with options. The function returns a
Promise<T>. */
export function typedFetch<T>(
    url: string,
    options?: RequestInit,
    validSchema?: object,
  ): Promise<T> {
    return fetch(url, options)
      .then((response: Response) => {
        if (response.status == 401) {
          console.info("Reauthenticate");
          let evt = new CustomEvent("popup-error", {
            detail: {
              message:
                "authentication token not found: please log out and log back in",
            },
          });
          document.dispatchEvent(evt);
        }
        if (!response.ok) {
          console.error("error fetching");
          throw new Error(response.statusText);
        }
  
        return response.json() as Promise<T>;
      })
      .then((response: T) => {
        if (Array.isArray(response)) {
          response.forEach((r) => {
            validateHelper(r, validSchema);
          });
        } else {
          validateHelper(response, validSchema);
        }
  
        return response;
      });
  }


  /**
 * This is a function that takes in a schema and runs validation, returning an error if the fetch
 * response is not valid
 * @param response what is being checking via validation
 * @param validSchema schema that response is validated against, created in schema file
 */
export function validateHelper<T>(response: T, validSchema?: object) {
    if (validSchema) {
      const Ajv = require("ajv");
      const ajv = new Ajv();
      const validate = ajv.compile(validSchema);
      if (!validate(response)) {
        console.error(`Token validation failed: ${ajv.errorsText(validate.errors)}`);
        throw new Error(
          `Token validation failed: ${ajv.errorsText(validate.errors)}`,
        );
      }
    }
  }


