export enum Events {
    CHARGE_SUCCESS ='charge.success',
    TRANSFER_SUCCESS = 'transfer.success',
    TRANSFER_FAILED = 'transfer.failed',
    TRANSFER_REVERSED = 'transfer.reversed',
    PAYMENT_REQUEST_PENDING = 'paymentrequest.pending',
    PAYMENT_REQUEST_SUCCESS = 'paymentrequest.success'
}

export enum EmpType {
    SUPERADMIN = 'superadmin',
    ADMIN = 'admin',
    TEACHER = 'teacher',
    STUDENT = 'student',
    PARENT = 'parent'
}

export enum Status {
    NEW = 'new',
    PENDING = 'pending',
    SUCCESS = 'success',
    ACTIVE = 'active',
    DELETED = 'deleted',
    EXPIRED = 'expired',
    BLOCKED = 'blocked',
    SUSPENDED = 'suspended',
    VACATION = 'vacation'
}

export enum ErrorCodes {
    CONTINUE = 100,
    SWITCHING_PROTOCOL = 101,
    EARLY_HINT = 103,
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NON_AUTHORTATIVE_INFORMATION = 203,
    NO_CONTENT = 204,
    RESET_CONTENT = 205,
    PARTIAL_CONTENT = 206,
    MULTIPLE_CHOISES = 300,
    MOVED_PERMANEETLY = 301,
    FOUND = 302,
    SEE_OTHERS = 303,
    NOT_MODIFIED = 304,
    TEMPORAL_REDIRECT = 307,
    PERMANENT_REDIRECT = 308,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    PAYMENT_REQUIRED = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOED = 405,
    NOT_ACCEPTABLE = 406,
    PROXY_AUTHENTICATION_REQUIRED = 407,
    REQUEST_TIMEOUT = 408,
    CONFLIT = 409,
    GONE = 410,
    LENGTH_REQUIRED = 411,
    PRECONDITION_FAILED = 412,
    PAYLOAD_TOO_LARGE = 413,
    URI_TOOL_LONG = 414,
    UNSUPPORTED_MEDIA_TYPE = 415,
    RANGE_NOT_SATISFIABLE = 416,
    EXPECTATION_FAILED = 417,
    IM_A_TEAPOT = 418,
    UNPROCESSABLE_ENTITY = 422,
    TOO_EARLY = 425,
    UPGRADE_REQUIRED = 426,
    PRECONDITION_REQUIRED = 428,
    TOO_MANY_REQUEST = 429,
    REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
    UNAVAILABLE_FOR_LEGAL_REASONS = 451,
    INTERNALE_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
    HTTP_VERSION_NOT_SUPPORTED = 505,
    VARIANT_ALSO_NEGOTIATES = 506,
    INSUFFICIENT_STORAGE = 507,
    LOOP_DETECTED = 508,
    NOT_EXTENDED = 510,
    NETWORK_AUTHENTICATION_REQUIRED = 511
}