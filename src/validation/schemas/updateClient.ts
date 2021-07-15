import * as Yup from 'yup';
import { getContent } from '../../utils/contentUtils';
import CreateClientSchema from './createClient';

function resolve() {
    const clientSchema = CreateClientSchema().shape({
        id: Yup.string()
            .required(getContent('clientAdmin.validationErrors.idRequired'))
    });
    return clientSchema;
}

// need to resolve schema at runtime due to content dependency
export default resolve;
