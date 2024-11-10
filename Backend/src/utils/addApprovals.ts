import DepartmentService from '../services/DepartmentService';
import ApprovalService from '../services/ApprovalService';
import { ApprovalAttributes } from '../models/approval';

const addApprovalsForClearanceRequest = async (clearanceRequestId: number) => {
  const departments = await DepartmentService.getAll();
  
  const approvalPromises = departments.map(department => {
    const approval: Omit<ApprovalAttributes, 'id'> = {
      status: 'pending',
      approval_date: null,
      comments: '',
      DepartmentId: department.id,
      ClearanceRequestId: clearanceRequestId,
    };
    return ApprovalService.addOne(approval);
  });

  await Promise.all(approvalPromises);
};

export default addApprovalsForClearanceRequest;
