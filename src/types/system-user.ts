export interface SystemUser {
  id: number;
  name: string;
  email: string;
  companyName: string;
  companyId: string;
  companyLogo?: string | null;
  phone?: string | null;
  branchLocation?: string | null;
  permissions?: string[];
  isActive?: boolean;
  paymentInfo?: {
    paymentstatus?: string;
    paymentmethod?: string;
    amount?: number;
    packagename?: string;
  } | null;
  createdAt?: string;
  updatedAt?: string;
  theme?: {
    id?: number;
    name?: string;
  } | null;
}

