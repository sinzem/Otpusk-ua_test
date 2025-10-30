class ApiError extends Error {
    public response: Response;
    constructor(response: Response) {
        super('ApiError:' + response.status);
        this.response = response;
    }
}

export const jsonApiInstance = async <T, K>({
    func,
    args,
    signal,
}: {
    signal?: AbortSignal;
    args?: K;
    func: (args?: K) => Promise<Response>;
}): Promise<T> => {
    signal?.addEventListener('abort', abort);

    const result = await func(args);
  
    if (!result.ok) {
        throw new ApiError(result);
    }

    const data = (await result.json()) as T;

    signal?.removeEventListener('abort', abort);
    
    return data;
};

function abort() {
    throw(new Error('Aborted'))
}

// export const jsonApiInstance = async <T>(
//     func: () => Promise<Response>,
// ): Promise<T> => {
//     const result = await func();

//     if (!result.ok) {
//         throw new ApiError(result);
//     }

//     const data = (await result.json()) as Promise<T>;

//     return data;
// };

// fetch_and_headers=========================================
// export const jsonApiInstance = async <T>(
//     url: string,
//     init?: RequestInit & { json?: unknown },
// ) => {
//     let headers = init?.headers ?? {};

//     if (init?.json) {
//         headers = {
//             'Content-Type': 'application/json',
//             ...headers,
//         };

//         init.body = JSON.stringify(init.json);
//     }

//     const result = await fetch(`${BASE_URL}${url}`, {
//         ...init,
//         headers,
//     });

//     if (!result.ok) {
//         throw new ApiError(result);
//     }

//     const data = (await result.json()) as Promise<T>;

//     return data;
// };