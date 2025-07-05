import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Service } from "./service.entity";
import { Repository } from "typeorm";
import { CreateServiceDto } from "../../dtos/CreateServiceDto";

Injectable({})
export class ServiceService{
     constructor(
                    @InjectRepository(Service) private serviceRepository: Repository<Service>,
                ){}
    async getService(): Promise<Service[]> {
        return await this.serviceRepository.find();
    }

    async getServiceById(id: string): Promise<Service | null> {
      return await this.serviceRepository.findOneBy({ id: Number(id) });
    }

    async saveService(service: CreateServiceDto): Promise<Service> {
      return await this.serviceRepository.save(service);
    }

    async updateService(id: string, data: CreateServiceDto): Promise<Service> {
      const service = await this.serviceRepository.findOneBy({ id: Number(id) });
    
      if (!service) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
      }
    
      Object.assign(service, data); // Solo sobreescribe los campos presentes
      return this.serviceRepository.save(service);
    }
    
    async deleteService(id: string): Promise<{ message: string }> {
      await this.serviceRepository.delete(id);
      return { message: `Usuario con id ${id} eliminado` };
    }
    
}