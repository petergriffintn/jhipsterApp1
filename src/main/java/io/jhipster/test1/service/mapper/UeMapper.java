package io.jhipster.test1.service.mapper;

import io.jhipster.test1.domain.*;
import io.jhipster.test1.service.dto.UeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Ue and its DTO UeDTO.
 */
@Mapper(componentModel = "spring", uses = {ProgrammeMapper.class})
public interface UeMapper extends EntityMapper<UeDTO, Ue> {

    @Mapping(source = "programme.id", target = "programmeId")
    UeDTO toDto(Ue ue);

    @Mapping(source = "programmeId", target = "programme")
    Ue toEntity(UeDTO ueDTO);

    default Ue fromId(Long id) {
        if (id == null) {
            return null;
        }
        Ue ue = new Ue();
        ue.setId(id);
        return ue;
    }
}
