import React from 'react';
import { ClientDashboard } from './ClientDashboard';

interface PortalOverviewProps {
  onNavigateTab: (tab: string) => void;
  onOpenDeployModal: () => void;
}

export const PortalOverview: React.FC<PortalOverviewProps> = (props) => {
  return <ClientDashboard {...props} />;
};

