import { Schema } from '../middlewares/validate-body'


export const LookupSchema: Schema = {
    fields: {
        userdetails: 'string'
    },
    required: ['userdetails']
}

export const BranchSchema: Schema = {
    fields: {
        name: 'string',
        address: 'object',
        company_id: 'string',
        phonenumber: 'string',
        logo_url: '	string',
        multiadd: 'object'
    },
    required: ['name', 'address', 'company_id'],
    optional: ['multiadd']
}

export const CompanySchema: Schema = {
    fields: {
        id: 'string',
        name: 'string',
        address: 'string',
        phonenumber: 'string',
        company: 'string',
        logo_url: 'string',
        multiadd: 'object'
    },
    required: ['name', 'address'],
    optional: ['multiadd', 'company']
}

export const CustomerSchema: Schema = {
    fields: {
        fullname: 'string',
        email: 'string',
        company: 'string',
        address: 'string',
        notes: 'string',
        company_id: 'string',
        branch_id: 'string',
        multiadd: 'object'
    },
    required: ['name', 'address', 'company_id'],
    optional: ['branch_id', 'multiadd']
}

export const EmployeeSchema: Schema = {
    fields: {
        id: 'string',
        fullname: 'string',
        address: 'string',
        email: 'string',
        phonenumber: 'string',
        userid: 'string',
        is_same_bank: 'boolean',
        bank_branch: 'string',
        account_number: 'string',
        account_currency: 'string',
        account_type: 'string',
        bank_name: 'string',
        bank_address_line: 'string',
        bank_city: 'string',
        bank_state: 'string',
        bank_country: 'string',
        branch: 'string',
        department: 'string',
        ssnit: 'number',
        status: 'number',
        employeetype: 'string',
        company_id: 'string',
        branch_id: 'string',
        bank_details_id: 'string',
        supplier_id: 'string',
        multiadd: 'object'
    },
    required: ['fullname', 'address', 'employeetype', 'userid', 'company_id'],
    optional: ['branch_id', 'multiadd', 'bank_details_id']
}

export const ProductSchema: Schema = {
    fields: {
        id: 'string',
        product_ids: 'object',
        name: 'string',
        quantity: 'number',
        unit_price: 'number', // changed from retail_price to unit_price to accomodate changes in the frontend
        cost_price: 'number',
        wholesale_price: 'number',
        low_quantity_level: 'number',
        image: 'string',
        company_id: 'string',
        branch_id: 'string',
        product_type_id: 'string',
        collection_id: 'string',
        category: 'string',
        perishable: 'string',
        size_id: 'string',
        supplier_id: 'string',
        taxable: 'string',
        multiadd: 'object'
    },
    required: ['name', 'cost_price', 'unit_price', 'quantity'],
    optional: ['branch_id', 'multiadd', 'company_id']
}

export const SupplierSchema: Schema = {
    fields: {
        name: 'string',
        address: 'object',
        collection: 'string',
        company_id: 'string',
        branch_id: 'string',
        address_id: 'string',
        logo_url: 'string',
        website_url: 'string',
        type: 'string',
        email: 'string',
        phonenumber: 'string',
        multiadd: 'object'
    },
    required: ['name', 'company_id'],
    optional: ['branch_id', 'multiadd', 'address_id']
}

export const UserSchema: Schema = {
    fields: {
        role: 'string',
        password: 'string',
        password_tries: 'number',
        status: 'number',
        ip_address: 'string',
        employee_id: 'string',
        company_id: 'string',
        branch_id: 'string',
        multiadd: 'object'
    },
    required: ['role', 'password', 'employee_id', 'company_id'],
    optional: ['branch_id', 'multiadd']
}