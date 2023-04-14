import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import * as bcrypt from 'bcrypt';
import { Neo4jService } from '@brakebein/nest-neo4j';
import { User } from 'src/models/user.model';
import { NotFoundException } from '@nestjs/common/exceptions';
import { mergeScan } from 'rxjs';

@Injectable()
export class MemberService {
  constructor(private neo: Neo4jService) {

  }
  // async create(dto: CreateMemberDto) {
  //   try {
  //     const encryptedPassword = bcrypt.hashSync(dto.password, 10);
  //     const query= await this.neo.write(`merge (m:member {firstName:"${dto.firstName}",
  //     lastName:"${dto.lastName}",
  //     email:"${dto.email}",
  //     mobileNo:"${dto.mobileNo}",
  //     password:"${dto.password}"
  //   ,memberId:"${dto.memberId}" }) 
  //    return m
  //    union
  //    merge(g:gym {gymId: "${dto.gymId}"})-[r:HAS_MEMBER]->(m:member{memberId:"${dto.memberId}"}) return m`);

  //   return { data: query, msg:"ok"}
  //   } catch (error) {
  //     return new HttpException(error, 503);
  //   }
  // }

  async create(dto: CreateMemberDto) {
    try {

      const crypto = require('crypto');
      const memberId = crypto.randomUUID(); 

      const encryptedPassword = bcrypt.hashSync(dto.password, 10);
      const query= await this.neo.write(`
      CREATE (m:Member {firstName:"${dto.firstName}",
      lastName:"${dto.lastName}", 
      email:"${dto.email}",
      mobileNo:"${dto.mobileNo}",
      password:"${dto.password}",
      memberId:"${dto.memberId}" }) 
      return m
      union
      merge(g:gym {gymId: "${dto.gymId}"})-[r:HAS_MEMBER]->(m:member{memberId:"${dto.memberId}"}) return m`);

      console.log("GymID->",dto.gymId);
      console.log("MemberID->",dto.memberId);

     
      

    return { data: query, msg:"ok"}
    } catch (error) {
      return new HttpException(error, 503);
    }
  }

  async findAll() {

    try {
      const res = await this.neo.read(`MATCH (u:User) where ANY (x in u.roles WHERE x= 'MEMBER') return u `)

      res.map(r => {
        console.log(r);
      })
      return res;

    } catch (error) {
      throw new NotFoundException();
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} member`;
  }

  async update(id: string, dto: UpdateMemberDto) {
    try {
      const res = await this.neo.write(`MATCH (u:User) where u.id="${id}" 
      SET
      u.email="${dto.email}",
      u.firstName="${dto.firstName}",
      u.lastName="${dto.lastName}",
      u.mobileNo="${dto.mobileNo}"
      return u
      `)
      return "member updated successfully";
    } catch (error) {
      throw new HttpException("error updating member", error)
    }
  }

  async remove(id: string) {
    try {
      const res = await this.neo.write(`MATCH (u:User {id:"${id}"}) DETACH DELETE u`);
      return "member deleted successfully";

    } catch (error) {
      throw new HttpException("error", error)
    }
  }
}


