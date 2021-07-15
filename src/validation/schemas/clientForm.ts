import * as Yup from 'yup';
import { getContent } from '../../utils/contentUtils';

function resolve() {
    const schema = Yup.object().shape({
        name: Yup.string()
            .required(getContent('clientAdmin.validationErrors.required')),
        contractStart: Yup.string()
            .required(getContent('clientAdmin.validationErrors.required')).nullable(),
        contractEnd: Yup.string()
            .required(getContent('clientAdmin.validationErrors.required')).nullable()
    });
    return schema;
}

// need to resolve schema at runtime due to content dependency
export default resolve;
