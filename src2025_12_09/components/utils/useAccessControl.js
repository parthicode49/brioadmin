// hooks/useAccessControl.js
import { useSelector } from 'react-redux';

export const useAccessControl = (requiredAccess) => {
  const reduxRights = useSelector((state) => state?.layout?.rights);
  const loginedDetails = JSON.parse(sessionStorage.getItem("loggedInDetails"));
  
  const rights = reduxRights || loginedDetails?.master_rights;

  const getAccessLevel = (contentName) => {
    if (!rights || !Array.isArray(rights)) {
      return "All Access";
    }
    
    const right = rights?.find(r => r.content === contentName);
    return right?.content_value || "All Access";
  };

  const accessLevel = getAccessLevel(requiredAccess);

  return {
    accessLevel,
    canView: accessLevel === "Only View" || accessLevel === "All Access",
    canEdit: accessLevel === "All Access",
    hasNoAccess: accessLevel === "No Access",
    isReadOnly: accessLevel === "Only View"
  };
};
