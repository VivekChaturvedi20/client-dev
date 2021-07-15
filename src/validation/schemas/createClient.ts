import * as Yup from 'yup';
import { getContent } from '../../utils/contentUtils';

function resolve() {
    const schema = Yup.object().shape({
        name: Yup.string()
            .required(getContent('clientAdmin.validationErrors.nameRequired')),
        active: Yup.boolean()
            .required(getContent('clientAdmin.validationErrors.activeRequired')),
        contractStart: Yup.date()
            .required(getContent('clientAdmin.validationErrors.contractStart.required')),
        contractEnd: Yup.date()
            .required(getContent('clientAdmin.validationErrors.contractEnd.required')),
        userExtRef: Yup.string()
            .required(getContent('clientAdmin.validationErrors.userExtRef.required'))
    });
    return schema;
}

// need to resolve schema at runtime due to content dependency
export default resolve;
