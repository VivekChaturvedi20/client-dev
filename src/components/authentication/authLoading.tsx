import React from 'react';
import { getContent } from '../../utils/contentUtils';

export const AuthLoading = () => <div>{getContent('authorization.inProgress')}</div>;
