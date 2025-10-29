class ApiError extends Error {
    public response: Response;
    constructor(response: Response) {
        super('ApiError:' + response.status);
        this.response = response;
    }
}

export const jsonApiInstance = async <T>(
    func: () => Promise<Response>,
): Promise<T> => {
    const result = await func();

    if (!result.ok) {
        throw new ApiError(result);
    }

    const data = (await result.json()) as Promise<T>;

    return data;
};
