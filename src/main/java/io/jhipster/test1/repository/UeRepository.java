package io.jhipster.test1.repository;

import io.jhipster.test1.domain.Ue;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Ue entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UeRepository extends JpaRepository<Ue, Long> {

}
