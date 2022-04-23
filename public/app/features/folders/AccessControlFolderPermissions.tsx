import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { Permissions } from 'app/core/components/AccessControl';
import Page from 'app/core/components/Page/Page';
import { contextSrv } from 'app/core/core';
import { GrafanaRouteComponentProps } from 'app/core/navigation/types';
import { getNavModel } from 'app/core/selectors/navModel';
import { AccessControlAction, StoreState } from 'app/types';

import { getFolderByUid } from './state/actions';
import { getLoadingNav } from './state/navModel';

interface RouteProps extends GrafanaRouteComponentProps<{ uid: string }> {}

function mapStateToProps(state: StoreState, props: RouteProps) {
  const uid = props.match.params.uid;
  return {
    uid: uid,
    navModel: getNavModel(state.navIndex, `folder-permissions-${uid}`, getLoadingNav(1)),
  };
}

const mapDispatchToProps = {
  getFolderByUid,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type Props = ConnectedProps<typeof connector>;

export const AccessControlFolderPermissions = ({ uid, getFolderByUid, navModel }: Props) => {
  useEffect(() => {
    getFolderByUid(uid);
  }, [getFolderByUid, uid]);

  const canListUsers = contextSrv.hasPermission(AccessControlAction.OrgUsersRead);
  const canSetPermissions = contextSrv.hasPermission(AccessControlAction.FoldersPermissionsWrite);

  return (
    <Page navModel={navModel}>
      <Page.Contents>
        <Permissions
          resource="folders"
          resourceId={uid}
          canListUsers={canListUsers}
          canSetPermissions={canSetPermissions}
        />
      </Page.Contents>
    </Page>
  );
};

export default connector(AccessControlFolderPermissions);
