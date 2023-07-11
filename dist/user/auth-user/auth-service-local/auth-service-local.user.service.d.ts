import { CompareHashDataService } from '../../../hash/compare-hash-data/compare-hash-data.service';
import { password } from '../types/password';
export declare class AuthServiceLocalUserService {
    private compareHash;
    constructor(compareHash: CompareHashDataService);
    validateData(password: password): Promise<void>;
}
