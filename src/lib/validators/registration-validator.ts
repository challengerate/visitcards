import { z } from 'zod'

const RoleValidator = z.enum(['employee', 'manager', 'manager_lead', 'sales_employee', 'sales_lead', 'ceo', 'admin'])
const DepartmentValidator = z.enum(['wordpress', 'ui_ux', 'graphic', 'shopify', 'all'])

export const RegistrationValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  role: RoleValidator,
  department: DepartmentValidator.optional(),
  managerId: z.string().optional(),
  managerLeadId: z.string().optional(),
  salesLeadId: z.string().optional(),
  ceoId: z.string().optional(),
}).refine(data => {
  if (['ceo', 'admin'].includes(data.role)) {
    return true;
  }
  return !!data.department;
}, {
  message: "Department is required for non-CEO and non-admin roles",
  path: ["department"],
});

export type TRegistrationValidator = z.infer<typeof RegistrationValidator>