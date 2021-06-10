import { OpenAPISecurityRequirement, ExtendedRoleScheme } from '../../types';
import { PERMISSION_SCHEMES_SECTION_PREFIX } from '../../utils/openapi';
import { OpenAPIParser } from '../OpenAPIParser';


export class RoleRequirementModel {
  schemes: ExtendedRoleScheme[];

  constructor(requirement: OpenAPISecurityRequirement, parser: OpenAPIParser) {
    const schemes = (parser.spec.components && parser.spec.components['x-permissionSchemes']) || {};
    this.schemes = Object.keys(requirement || {})
      .map(id => {
        const scheme = parser.deref(schemes[id]);
        const roles = requirement[id] || [];

        if (!scheme) {
          console.warn(`Non existing security scheme referenced: ${id}. Skipping`);
          return undefined;
        }

        return {
          ...scheme,
          id,
          sectionId: PERMISSION_SCHEMES_SECTION_PREFIX + id,
          roles,
        };
      })
      .filter(scheme => scheme !== undefined) as ExtendedRoleScheme[];
  }
}
