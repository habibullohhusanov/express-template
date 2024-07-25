export const created = (res, data, message = "Created", token = false) => {
    if (token) {
        return res.status(201).json({
            status: true,
            data,
            token,
            message
        });
    }
    return res.status(201).json({
        status: true,
        data,
        message
    });
}
export const succes = (res, data, message = "Successfuly", token = false) => {
    if (token) {
        return res.status(200).json({
            status: true,
            data,
            token,
            message
        });
    }
    return res.status(200).json({
        status: true,
        data,
        message
    });
}
export const pagination = (res, message, data, page, count, limit) => {
    return res.status(200).json({
        status: true,
        data,
        currentPage: page,
        pagesCount: Math.ceil(count / limit),
        nextPage: Math.ceil(count / limit) < page + 1 ? null : page + 1,
        message
    });
}
export const notFound = (res, message = "Not Found") => {
    return res.status(404).json({
        status: false,
        data: [],
        message
    });
}
export const requestError = (res, message, token = false) => {
    if (token) {
        return res.status(400).json({
            status: false,
            data: [],
            token: null,
            message
        });
    }
    return res.status(400).json({
        status: false,
        data: [],
        message
    });
}
export const serverError = (res, message, pagination = false, token = false) => {
    if (pagination) {
        return res.status(500).json({
            status: false,
            data: [],
            currentPage: null,
            pagesCount: null,
            nextPage: null,
            message
        });
    }
    if (token) {
        return res.status(500).json({
            status: false,
            data: [],
            token: null,
            message
        });
    }
    return res.status(500).json({
        status: false,
        data: [],
        message
    });
}
export const unauthorized = (res, message = "Unauthorized", token = false) => {
    if (token) {
        return res.status(401).json({
            status: false,
            data: [],
            token: null,
            message
        });
    }
    return res.status(401).json({
        status: false,
        data: [],
        message
    });
}
