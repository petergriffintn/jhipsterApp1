package io.jhipster.test1.service.mapper;

import io.jhipster.test1.domain.*;
import io.jhipster.test1.service.dto.EeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Ee and its DTO EeDTO.
 */
@Mapper(componentModel = "spring", uses = {UeMapper.class})
public interface EeMapper extends EntityMapper<EeDTO, Ee> {

    @Mapping(source = "ue.id", target = "ueId")
    EeDTO toDto(Ee ee);

    @Mapping(source = "ueId", target = "ue")
    Ee toEntity(EeDTO eeDTO);

    default Ee fromId(Long id) {
        if (id == null) {
            return null;
        }
        Ee ee = new Ee();
        ee.setId(id);
        return ee;
    }
}
