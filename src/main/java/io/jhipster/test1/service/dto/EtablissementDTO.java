package io.jhipster.test1.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Etablissement entity.
 */
public class EtablissementDTO implements Serializable {

    private Long id;

    @NotNull
    private String libelleFr;

    @NotNull
    private String libelleAr;

    private Long universiteId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLibelleFr() {
        return libelleFr;
    }

    public void setLibelleFr(String libelleFr) {
        this.libelleFr = libelleFr;
    }

    public String getLibelleAr() {
        return libelleAr;
    }

    public void setLibelleAr(String libelleAr) {
        this.libelleAr = libelleAr;
    }

    public Long getUniversiteId() {
        return universiteId;
    }

    public void setUniversiteId(Long universiteId) {
        this.universiteId = universiteId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        EtablissementDTO etablissementDTO = (EtablissementDTO) o;
        if(etablissementDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), etablissementDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EtablissementDTO{" +
            "id=" + getId() +
            ", libelleFr='" + getLibelleFr() + "'" +
            ", libelleAr='" + getLibelleAr() + "'" +
            "}";
    }
}
