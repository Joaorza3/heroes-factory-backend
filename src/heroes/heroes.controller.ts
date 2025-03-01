import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res } from '@nestjs/common';
import { HeroesService } from './heroes.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { IHeroesFilters } from 'src/interfaces/heroes-filters.interface';
import { Response } from 'express';

@Controller('heroes')
export class HeroesController {
  constructor(private readonly heroesService: HeroesService) {}

  @Post()
  create(@Body() createHeroDto: CreateHeroDto) {
    return this.heroesService.create(createHeroDto);
  }

  @Get('/report')
  async generateCsvReport(@Res() res: Response)  {
    const csvData = await this.heroesService.generateCsvReport();
    
    res.header('Content-Type', 'text/csv');
    res.attachment('heroes-report.csv');

    return res.send(csvData);
  }

  @Get()
  findAll(@Query() filters: IHeroesFilters) {
    return this.heroesService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.heroesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHeroDto: UpdateHeroDto) {
    return this.heroesService.update(id, updateHeroDto);
  }

  @Patch(':id/activate')
  activate(@Param('id') id: string) {
    return this.heroesService.activate(id);
  }

  @Patch(':id/deactivate')
  deactivate(@Param('id') id: string) {
    return this.heroesService.deactivate(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.heroesService.remove(id);
  }
}
