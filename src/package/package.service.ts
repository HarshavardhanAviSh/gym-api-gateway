import { Neo4jService } from '@brakebein/nest-neo4j';
import { Get, HttpException, Injectable, NotFoundException, Param } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { ServiceDTO } from './dto/service.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import * as crypto from 'crypto';

@Injectable()
export class PackageService {

  constructor(private neo:Neo4jService){

  }
  async create(dto: CreatePackageDto) {
    try {
      const query=`CREATE (p:Package { name:"${dto.name}",
      createdOn:"${Date.now().toString()}",
      description:"${dto.description}",
      imgUrl:"${dto.imgUrl}",
      validFrom:"${dto.validFrom}",
      validTo:"${dto.validTo}",
      amount:"${dto.amount}",
      id:"${crypto.randomUUID()}"}) return p`

    const res= await this.neo.write(query);
      if(res && res.length>0){
        let packageId="";
        res.map((row)=>packageId=row.p.id)
        console.log(packageId);
        const q =`MATCH (g:Gym),(p:Package) WHERE 
        g.gymId='${dto.createdBy}' AND p.id='${packageId}  
        CREATE (g) - [r:HAS_PACKAGE] -> (p) RETURN type(r)`
        await this.neo.write(q) 
        

        
      return true; 
      }
    } catch (error) {
      console.log(error)
    }
  }

  async createDefaultservice(dto:ServiceDTO){
    try {
      console.log('inside package service')
      let defaultSvcs:ServiceDTO[]=[{
        id:crypto.randomUUID(),
        isDefault:true,
        name:'cardio',
        imgUrl:'../assets/cardio1.jpg'
      },
      {
        id:crypto.randomUUID(),
        isDefault:true,
        name:'personal training',
        imgUrl:'../assets/Trainer1.jpg'
      },
      {
        id:crypto.randomUUID(),
        isDefault:true,
        name:'sauna',
        imgUrl:'../assets/sauna.jpg'
      }
    ];
          
    defaultSvcs.forEach(async (svc)=>{
      const query=`CREATE (s:Service { id:"${svc.id}", 
      name:"${svc.name}", 
      imgUrl:"${svc.imgUrl}",
      isDefault:"${svc.isDefault}"}) return s`
      console.log(query);
     const res=await this.neo.write(query);
      console.log(res);

    })

    console.log('outside loop')
    return true;

    } catch (error) {
      console.log(error);
      throw new HttpException(error,402)
    }
  }


  testPService() {

    try {

     let q =  this.neo.read(`MATCH (p:Package),(s:Service) 
      WHERE p.id='1e67270f-8dcb-4a39-9c89-7730f5442050' AND s.id='38a2ca02-9e37-449a-9192-80ce4f2b1348' 
      CREATE (p) - [r:HAS_SERVICE] -> (s) RETURN type(r)`)

    } 
    catch(error) {
     return new NotFoundException('Package Not Found!')
    }
     
  }


  createCustomService(){

  }


  findAll() {
    return `This action returns all package`;
  }

  
  findOne(id: number) {
    return `This action returns a #${id} package`;
  }


  update(id: number, updatePackageDto: UpdatePackageDto) {
    return `This action updates a #${id} package`;
  }

  remove(id: number) {
    return `This action removes a #${id} package`;
  }

}
