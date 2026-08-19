import { makeAutoObservable } from 'mobx';

import { type APIClient } from '@talknest/api';
import {
  CreateUserInput,
  CreateUserAPIResponse,
  UserDTO,
} from '@talknest/api/users';

import { AuthState } from '../domain/authState';
import { MemberDm } from '../domain/memberDm';
import { UserDm } from '../domain/userDm';

export class AuthStore {
  public authState = new AuthState();

  constructor(public apiClient: APIClient) {
    makeAutoObservable(this);
    this.initialize();
  }

  private async initialize() {}

  public getToken() {
    // Temporary for Pattern-First
    return 'temp';
  }

  getCurrentUser() {
    return this.authState.user;
  }

  getCurrentMember() {
    return this.authState.member;
  }

  public async register(
    input: CreateUserInput,
    allowMarketingEmails: boolean,
  ): Promise<CreateUserAPIResponse> {
    // Implement
    throw new Error('Not yet implemented');
  }

  private setupInitialUserAndMember(userDTO: UserDTO) {
    this.authState.user = UserDm.fromDTO(userDTO);
    this.authState.member = MemberDm.fromInitialUser(
      this.authState.user,
    );
  }

  public isAuthenticated(): boolean {
    return !!this.authState.user;
  }

  async logout(): Promise<void> {
    // Clear all state by updating properties
    this.authState.user = null;
    this.authState.member = null;
  }
}
