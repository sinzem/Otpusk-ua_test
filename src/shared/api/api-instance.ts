class ApiError extends Error {
    public response: Response;
    constructor(response: Response) {
        super('ApiError:' + response.status);
        this.response = response;
    }
}

export const jsonApiInstance = async <T, K>({
    func,
    signal,
    args
}: {
    signal: AbortSignal;
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
