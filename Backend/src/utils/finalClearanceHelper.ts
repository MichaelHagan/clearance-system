import ApprovalRepo from '@src/repos/ApprovalRepo';
import { sendMail } from '@src/utils/emailHelper';

const checkAndNotifyFinalClearance = async (email: string, name: string, clearanceRequestId: number) => {
  const approvals = await ApprovalRepo.getAllByClearanceRequestId(clearanceRequestId);
  const allApproved = approvals.every(approval => approval.status === 'approved');

  if (allApproved) {
    const subject = 'Congratulations! You have been fully cleared';
    const message = `Dear ${name},\n\nCongratulations! You have been fully cleared from all departments.\n\nBest Regards,\nKAIPTC Team`;
    await sendMail(email, subject, message);
  }
};

export default checkAndNotifyFinalClearance;
