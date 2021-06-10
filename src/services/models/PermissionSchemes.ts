import { ExtendedRoleScheme, Referenced } from '../../types';
import { PERMISSION_SCHEMES_SECTION_PREFIX } from '../../utils/openapi';
import { OpenAPIParser } from '../OpenAPIParser';

export class PermissionSchemeModel {
  id: string;
  sectionId: string;
  type: ExtendedRoleScheme['type'];
  roles?: string[];


  constructor(parser: OpenAPIParser, id: string, scheme: Referenced<ExtendedRoleScheme>) {
    const info = parser.deref(scheme);
    this.id = id;
    this.sectionId = PERMISSION_SCHEMES_SECTION_PREFIX + id;
    this.type = info.type;
    this.roles = info.roles;
  }
}

export class PermissionSchemesModel {
  schemes: PermissionSchemeModel[];

  constructor(parser: OpenAPIParser) {
    const schemes = (parser.spec.components && parser.spec['x-permissionSchemes']) || {};
    this.schemes = Object.keys(schemes).map(
      name => new PermissionSchemeModel(parser, name, schemes[name]),
    );
  }
}
