export class CreateUserDto {
    readonly userid: string;
    readonly password: string;
    readonly name: string;
    readonly email: string;
    readonly phoneNumber: number;
    readonly businessRegistrationNumber: number;
}