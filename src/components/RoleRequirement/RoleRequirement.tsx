// import { transparentize } from 'polished';
import * as React from 'react';

import styled, { media } from '../../styled-components';

import { Link, UnderlinedHeader } from '../../common-elements/';
import { RoleRequirementModel } from '../../services/models/RoleRequirement';
import { linksCss } from '../Markdown/styled.elements';

const ScopeName = styled.code`
  font-size: ${props => props.theme.typography.code.fontSize};
  font-family: ${props => props.theme.typography.code.fontFamily};
  border: 1px solid ${({ theme }) => theme.colors.border.dark};
  margin: 0 3px;
  padding: 0.2em;
  display: inline-block;
  line-height: 1;

  &:after {
    content: ',';
  }
  &:last-child:after {
    content: none;
  }
`;

const RoleRequirementAndWrap = styled.span`
  &:after {
    content: ' AND ';
    font-weight: bold;
  }

  &:last-child:after {
    content: none;
  }

  ${linksCss};
`;

export interface RoleRequirementProps {
  role: RoleRequirementModel;
}

export class RoleRequirement extends React.PureComponent<RoleRequirementProps> {
  render() {
    const role = this.props.role;
    return (
      <div>
        {role.schemes.map(({ id, roles, sectionId }) => {
          console.log(id, roles, sectionId)
          return (
            <RoleRequirementAndWrap key={id}>
              <Link to={sectionId}>{id}</Link>
              {roles.length > 0 && ' ('}
              {roles.map(role => (
                <ScopeName key={role}>{role}</ScopeName>
              ))}
              {roles.length > 0 && ') '}
            </RoleRequirementAndWrap>
          );
        })}
      </div>
    );
  }
}

const AuthHeaderColumn = styled.div`
  flex: 1 1 auto;
`;

const RolesColumn = styled.div`
  width: ${props => props.theme.schema.defaultDetailsWidth};
  ${media.lessThan('small')`
    margin-top: 10px;
  `}
`;

const AuthHeader = styled(UnderlinedHeader)`
  display: inline-block;
  margin: 0;
`;

const Wrap = styled.div`
  width: 100%;
  display: flex;
  margin: 1em 0;

  ${media.lessThan('small')`
    flex-direction: column;
  `}
`;

export interface RoleRequirementsProps {
  roles: RoleRequirementModel[];
}

export class RoleRequirements extends React.PureComponent<RoleRequirementsProps> {
  render() {
    const roles = this.props.roles;
    if (!roles || !roles.length) {
      return null;
    }
    return (
      <Wrap>
        <AuthHeaderColumn>
          <AuthHeader>Roles: </AuthHeader>
        </AuthHeaderColumn>
        <RolesColumn>
          {roles.map((role, idx) => (
            <RoleRequirement key={idx} role={role} />
          ))}
        </RolesColumn>
      </Wrap>
    );
  }
}
